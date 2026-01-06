/**
 * API service for communicating with the backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * Analyze an image for ingredients
 */
export async function analyzeImage(imageUri) {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'fridge-photo.jpg',
    });

    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error('Image analysis failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

/**
 * Generate recipes based on ingredients
 */
export async function generateRecipes(ingredients, userPreferences = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients,
        preferences: userPreferences,
      }),
    });

    if (!response.ok) {
      throw new Error('Recipe generation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw error;
  }
}

/**
 * Get recipe details
 */
export async function getRecipeDetails(recipeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
}

/**
 * Get shopping list for a recipe
 */
export async function getShoppingList(recipeId, availableIngredients) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}/shopping-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        availableIngredients,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shopping list');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    throw error;
  }
}

/**
 * Save a recipe to user's favorites
 */
export async function saveRecipe(userId, recipeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save recipe');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
}

/**
 * Get user's favorite recipes
 */
export async function getFavoriteRecipes(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/favorites`);

    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(userId, preferences) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating preferences:', error);
    throw error;
  }
}

/**
 * Get recipe history for user
 */
export async function getRecipeHistory(userId, limit = 10) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/${userId}/history?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
}

/**
 * Generic API error handler
 */
export function handleApiError(error) {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response
    return {
      message: 'No response from server',
      status: 0,
    };
  } else {
    // Error in request setup
    return {
      message: error.message || 'An unknown error occurred',
      status: -1,
    };
  }
}

export default {
  analyzeImage,
  generateRecipes,
  getRecipeDetails,
  getShoppingList,
  saveRecipe,
  getFavoriteRecipes,
  updateUserPreferences,
  getRecipeHistory,
  handleApiError,
};
