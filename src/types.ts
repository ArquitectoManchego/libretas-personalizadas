export interface DesignItem {
  id: string;
  title: string;
  category: 'infantil' | 'harry_potter';
  characterName: string;
  characterImg: string;
  image?: string; // Real photograph for catalog
  bgColor: string;
  bgType: 'solid' | 'full_pattern' | 'full_image';
  bgImage?: string;
  defaultSubject: string;
  defaultStudentName: string;
  subjectFont: string;
  studentFont: string;
  subjectGraphicStyle: string; // e.g. 'style-pop', 'style-3d-gold', 'style-neon'
  description: string;
  isPopular?: boolean;
}

export interface CartItem {
  cartId: string;
  designId?: string;
  isCustom: boolean;
  subject: string;
  studentName: string;
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
  isPackage: boolean; // true = pack of 6, false = individual
  unitPrice: number;
  totalPrice: number;
}

export interface CustomizationState {
  subject: string;
  studentName: string;
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
}
