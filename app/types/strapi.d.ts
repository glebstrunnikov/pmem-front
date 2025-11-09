// Strapi API Response Types

declare global {
  /**
   * Image format for different sizes
   */
  interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null | string;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
  }

  /**
   * Image formats collection
   */
  interface ImageFormats {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  }

  /**
   * Strapi media/image object
   */
  interface StrapiMedia {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: null | any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }

  /**
   * Base text node in content
   */
  interface TextNode {
    text: string;
    type: "text";
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  }

  /**
   * Link node in content
   */
  interface LinkNode {
    type: "link";
    url: string;
    children: TextNode[];
  }

  /**
   * Paragraph block
   */
  interface ParagraphBlock {
    type: "paragraph";
    children: (TextNode | LinkNode)[];
  }

  /**
   * Heading block
   */
  interface HeadingBlock {
    type: "heading";
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: TextNode[];
  }

  /**
   * Quote block
   */
  interface QuoteBlock {
    type: "quote";
    children: TextNode[];
  }

  /**
   * Code block
   */
  interface CodeBlock {
    type: "code";
    language?: string;
    children: TextNode[];
  }

  /**
   * List item
   */
  interface ListItemBlock {
    type: "list-item";
    children: TextNode[];
  }

  /**
   * List block (ordered or unordered)
   */
  interface ListBlock {
    type: "list";
    format: "ordered" | "unordered";
    children: ListItemBlock[];
  }

  /**
   * Image block with embedded image data
   */
  interface ImageBlock {
    type: "image";
    image: StrapiMedia;
    children: TextNode[];
  }

  /**
   * Union type for all possible block types
   */
  type contentNode =
    | ParagraphBlock
    | HeadingBlock
    | QuoteBlock
    | CodeBlock
    | ListBlock
    | ImageBlock;

  /**
   * Localization reference (simplified version of Post)
   */
  interface PostLocalization {
    id: number;
    documentId: string;
    title: string;
    lead: string | null;
    Text: string | null;
    content: contentNode[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    slug: string;
  }

  /**
   * Main Post/Article entity
   */
  interface Post {
    id: number;
    documentId: string;
    title: string;
    lead: string | null;
    Text: string | null;
    content: contentNode[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    slug: string;
    cover: StrapiMedia | null;
    localizations: PostLocalization[];
    video: StrapiMedia | null;
    tags: Tag[];
    subtitle: string | null;
  }

  /**
   * Pagination metadata
   */
  interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }

  /**
   * Response metadata
   */
  interface ResponseMeta {
    pagination: PaginationMeta;
  }

  /**
   * Main Strapi API response wrapper
   */
  interface StrapiResponse<T = Post> {
    data: T[];
    meta: ResponseMeta;
  }

  /**
   * Single item Strapi response
   */
  interface StrapiSingleResponse<T = Post> {
    data: T;
    meta?: ResponseMeta;
  }

  interface Tag {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  }
}

export {};
