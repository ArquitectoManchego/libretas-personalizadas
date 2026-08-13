export interface DesignItem {
  id: string;
  title: string;
  category: 'infantil' | 'harry_potter';
  characterName: string;
  characterImg: string;
  image?: string;
  bgColor: string;
  bgType: 'solid' | 'full_pattern' | 'full_image';
  bgImage?: string;
  defaultSubject: string;
  defaultStudentName: string;
  defaultGradeGroup?: string;
  subjectFont: string;
  studentFont: string;
  subjectGraphicStyle: string;
  description: string;
  isPopular?: boolean;
  isStickerProduct?: boolean; // For inf-9
}

export interface CartItem {
  cartId: string;
  designId?: string;
  isCustom: boolean;
  isStickerProduct?: boolean;
  stickerOption?: '8_cut' | '32_sheet';
  subject: string;
  studentName: string;
  gradeGroup?: string;
  omitSubject?: boolean;
  omitStudentName?: boolean;
  omitGradeGroup?: boolean;
  bgColor: string;
  bgType: 'solid' | 'full_pattern' | 'full_image';
  bgImage?: string;
  characterImg: string;
  characterName: string;
  image?: string;
  subjectFont: string;
  studentFont: string;
  subjectGraphicStyle: string;
  spineText: string;
  quantity: number;
  isPackage: boolean;
  unitPrice: number;
  totalPrice: number;
  
  // Dimensions
  notebookType?: 'espiral' | 'sin_espiral';
  notebookWidth?: string;
  notebookHeight?: string;
  notebookSpine?: string;
}

export interface CustomizationState {
  subject: string;
  studentName: string;
  gradeGroup: string;
  omitSubject: boolean;
  omitStudentName: boolean;
  omitGradeGroup: boolean;
  bgColor: string;
  bgType: 'solid' | 'full_pattern' | 'full_image';
  bgImage: string;
  characterImg: string;
  characterName: string;
  subjectFont: string;
  studentFont: string;
  subjectGraphicStyle: string;
  spineText: string;
  isPackage: boolean;
  
  // Notebook dimensions
  notebookType: 'espiral' | 'sin_espiral';
  notebookWidth: string;
  notebookHeight: string;
  notebookSpine: string;
}
