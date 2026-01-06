import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// Primary Button Component
export function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon: Icon = null,
  className = '',
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      className={`bg-primary-500 rounded-xl py-4 flex-row items-center justify-center ${className}`}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {Icon && <Icon width={20} height={20} color="white" strokeWidth={2} />}
          <Text className={`text-white font-bold ${Icon ? 'ml-2' : ''}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

// Secondary Button Component
export function SecondaryButton({
  title,
  onPress,
  icon: Icon = null,
  className = '',
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white border-2 border-neutral-200 rounded-xl py-4 flex-row items-center justify-center ${className}`}
      activeOpacity={0.7}
      {...props}
    >
      {Icon && (
        <Icon width={20} height={20} color="#212121" strokeWidth={2} />
      )}
      <Text className={`text-neutral-900 font-semibold ${Icon ? 'ml-2' : ''}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

// Card Component
export function Card({ children, className = '', onPress = null, ...props }) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      className={`bg-white rounded-2xl p-4 border border-neutral-200 ${className}`}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </Component>
  );
}

// Badge Component
export function Badge({
  label,
  variant = 'primary',
  className = '',
  ...props
}) {
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-700 border border-primary-200',
    accent: 'bg-accent-100 text-accent-700 border border-accent-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    error: 'bg-red-100 text-red-700 border border-red-200',
  };

  return (
    <View
      className={`px-3 py-1 rounded-full ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      <Text className="text-xs font-semibold">{label}</Text>
    </View>
  );
}

// Stat Display Component
export function StatDisplay({ icon: Icon, label, value, className = '' }) {
  return (
    <View className={`bg-white rounded-xl p-3 border border-neutral-200 ${className}`}>
      {Icon && (
        <View className="flex-row items-center gap-2 mb-1">
          <Icon width={16} height={16} color="#4CAF50" strokeWidth={2} />
          <Text className="text-xs text-neutral-600">{label}</Text>
        </View>
      )}
      <Text className="font-bold text-neutral-900 text-lg">{value}</Text>
    </View>
  );
}

// Empty State Component
export function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel = null,
  onAction = null,
  className = '',
}) {
  return (
    <View className={`items-center justify-center py-12 ${className}`}>
      {Icon && (
        <View className="bg-neutral-100 p-6 rounded-full mb-4">
          <Icon width={48} height={48} color="#9e9e9e" strokeWidth={1.5} />
        </View>
      )}
      <Text className="font-bold text-neutral-900 text-center text-lg mb-2">
        {title}
      </Text>
      <Text className="text-neutral-600 text-center text-sm mb-6 px-6">
        {message}
      </Text>
      {actionLabel && onAction && (
        <PrimaryButton title={actionLabel} onPress={onAction} />
      )}
    </View>
  );
}

// Loading State Component
export function LoadingState({ message = 'Loading...' }) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text className="text-neutral-600 mt-4">{message}</Text>
    </View>
  );
}

// Checkbox Component
export function Checkbox({
  checked = false,
  onPress = () => {},
  label = '',
  className = '',
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center ${className}`}
    >
      <View
        className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
          checked
            ? 'bg-primary-500 border-primary-500'
            : 'border-neutral-300'
        }`}
      >
        {checked && (
          <Text className="text-white font-bold text-xs">✓</Text>
        )}
      </View>
      {label && (
        <Text className="font-medium text-neutral-900">{label}</Text>
      )}
    </TouchableOpacity>
  );
}

// Header Component
export function Header({
  title,
  subtitle = null,
  onBack = null,
  rightElement = null,
  className = '',
}) {
  return (
    <View
      className={`px-6 py-4 border-b border-neutral-200 ${className}`}
    >
      <View className="flex-row items-center justify-between mb-1">
        {onBack && (
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
            {/* Icon to be provided */}
          </TouchableOpacity>
        )}
        <Text className="flex-1 font-bold text-2xl text-neutral-900">
          {title}
        </Text>
        {rightElement}
      </View>
      {subtitle && (
        <Text className="text-sm text-neutral-600 mt-1">{subtitle}</Text>
      )}
    </View>
  );
}

// Input Field Component
export function InputField({
  placeholder = '',
  value = '',
  onChangeText = () => {},
  multiline = false,
  keyboardType = 'default',
  className = '',
  ...props
}) {
  const TextComponent = require('react-native').TextInput;

  return (
    <TextComponent
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
      placeholderTextColor="#9e9e9e"
      className={`bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 ${className}`}
      {...props}
    />
  );
}

// Divider Component
export function Divider({ className = '' }) {
  return <View className={`h-px bg-neutral-200 ${className}`} />;
}

// Section Component
export function Section({ title, children, className = '' }) {
  return (
    <View className={`px-6 pt-6 ${className}`}>
      <Text className="font-bold text-lg text-neutral-900 mb-4">{title}</Text>
      {children}
    </View>
  );
}

export default {
  PrimaryButton,
  SecondaryButton,
  Card,
  Badge,
  StatDisplay,
  EmptyState,
  LoadingState,
  Checkbox,
  Header,
  InputField,
  Divider,
  Section,
};
