// Helper types
export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export type Card = Tables<"cards">;
export type CardPartial = Partial<Card>;
export type Project = Tables<"projects">;
export type ProjectPartial = Partial<Project>;


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
          content: string | null
          created_at: string
          height: number
          id: number
          project_id: string
          thumbnail: string | null
          type: Database["public"]["Enums"]["card_type"]
          width: number
          x_position: number
          y_position: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          height?: number
          id?: number
          project_id: string
          thumbnail?: string | null
          type: Database["public"]["Enums"]["card_type"]
          width?: number
          x_position?: number
          y_position?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          height?: number
          id?: number
          project_id?: string
          thumbnail?: string | null
          type?: Database["public"]["Enums"]["card_type"]
          width?: number
          x_position?: number
          y_position?: number
        }
        Relationships: [
          {
            foreignKeyName: "cards_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
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
