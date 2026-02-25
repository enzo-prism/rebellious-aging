export type SearchType = 'page' | 'pillar' | 'blog' | 'video' | 'resource' | 'section' | 'recipe';

export interface SearchDocument {
  id: string;
  type: SearchType;
  title: string;
  path: string;
  summary: string;
  /**
   * Optional longer text used only for ranking; not necessarily shown in the UI.
   */
  content?: string;
  /**
   * Optional tags like pillar/topic to support filtering and boosting.
   */
  tags?: string[];
  section?: string;
  updatedAt?: string;
}
