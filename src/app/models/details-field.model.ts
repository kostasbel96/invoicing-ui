export interface DetailField<T> {
  key: keyof T;
  label: string;
  getValue?: () => string | number | boolean | null | undefined;
}
