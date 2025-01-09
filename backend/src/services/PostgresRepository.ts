// src/repositories/PostgresRepository.ts
import { Pool, PoolClient } from "pg";
import { pgConfig } from "../config/database";

export class PostgresRepository {
  private static instance: PostgresRepository;
  private pool: Pool;
  private isInitialized: boolean = false;

  private constructor() {
    this.pool = new Pool(pgConfig);
    this.pool.on("error", (err) => {
      console.error("Unexpected PostgreSQL error:", err);
    });
  }

  public static getInstance(): PostgresRepository {
    if (!PostgresRepository.instance) {
      PostgresRepository.instance = new PostgresRepository();
    }
    return PostgresRepository.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log("PostgreSQL already initialized");
      return;
    }

    const client = await this.pool.connect();
    try {
      await client.query("SELECT 1");
      this.isInitialized = true;
      console.log("PostgreSQL connection established successfully");
    } catch (error) {
      console.error("Failed to initialize PostgreSQL:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async healthCheck(): Promise<boolean> {
    if (!this.isInitialized) {
      return false;
    }

    const client = await this.pool.connect();
    try {
      await client.query("SELECT 1");
      return true;
    } catch (error) {
      console.error("PostgreSQL health check failed:", error);
      return false;
    } finally {
      client.release();
    }
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    await this.pool.end();
    this.isInitialized = false;
    console.log("PostgreSQL connection closed");
  }
}
