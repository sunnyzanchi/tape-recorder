import JSX = preact.JSX

declare module 'react-reduce-motion' {
  /**
   * Whether the user has indicated in their settings
   * that they prefer reduced motion.
   */
  export function useReduceMotion(): boolean
}
