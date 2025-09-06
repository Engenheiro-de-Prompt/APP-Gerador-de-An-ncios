
export enum AppView {
  FORM,
  LOADING,
  RESULT,
}

export interface AdResult {
  imageUrl: string;
  strategy: string;
  imagePrompt: string;
  productDescription: string;
}
