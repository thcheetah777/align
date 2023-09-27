// Helper types
export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];


// Database
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          content: Tables<"note_content">
          created_at: string
          id: number
          project_id: string
          type: Database["public"]["Enums"]["card_type"]
          x_position: number
          y_position: number
        }
        Insert: {
          content: Tables<"note_content">
          created_at?: string
          id?: number
          project_id: string
          type: Database["public"]["Enums"]["card_type"]
          x_position?: number
          y_position?: number
        }
        Update: {
          content?: Tables<"note_content">
          created_at?: string
          id?: number
          project_id?: string
          type?: Database["public"]["Enums"]["card_type"]
          x_position?: number
          y_position?: number
        }
        Relationships: [
          {
            foreignKeyName: "cards_content_fkey"
            columns: ["content"]
            referencedRelation: "note_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      note_content: {
        Row: {
          id: string
          text: string | null
        }
        Insert: {
          id?: string
          text?: string | null
        }
        Update: {
          id?: string
          text?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          last_updated: string | null
          name: string
          status: Database["public"]["Enums"]["project_status"] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          last_updated?: string | null
          name: string
          status?: Database["public"]["Enums"]["project_status"] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          last_updated?: string | null
          name?: string
          status?: Database["public"]["Enums"]["project_status"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      card_type: "note" | "image" | "link" | "color" | "column" | "row"
      project_status:
        | "Backlog"
        | "Todo"
        | "In Progress"
        | "Finished"
        | "Canceled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
