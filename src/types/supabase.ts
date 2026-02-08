import type { Category, Tag, Tool, ToolTag, Post, Subscriber } from "./database";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      categories: { Row: Category; Insert: Omit<Category, "id" | "created_at">; Update: Partial<Category> };
      tags: { Row: Tag; Insert: Omit<Tag, "id" | "created_at">; Update: Partial<Tag> };
      tools: { Row: Tool; Insert: Omit<Tool, "id" | "created_at" | "updated_at">; Update: Partial<Tool> };
      tool_tags: { Row: ToolTag; Insert: ToolTag; Update: Partial<ToolTag> };
      posts: { Row: Post; Insert: Omit<Post, "id" | "created_at" | "updated_at">; Update: Partial<Post> };
      subscribers: {
        Row: Subscriber;
        Insert: Omit<Subscriber, "id">;
        Update: Partial<Subscriber>;
      };
    };
  };
}
