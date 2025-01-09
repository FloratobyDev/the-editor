// src/repositories/RedisRepository.ts
import { createClient, RedisClientType } from "redis";
import { redisConfig } from "../config/database";

export class RedisRepository {
  private static instance: RedisRepository;
  private client: RedisClientType;
  private isInitialized: boolean = false;

  private constructor() {
    this.client = createClient(redisConfig);
    this.client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });
  }

  public static getInstance(): RedisRepository {
    if (!RedisRepository.instance) {
      RedisRepository.instance = new RedisRepository();
    }
    return RedisRepository.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log("Redis already initialized");
      return;
    }

    try {
      await this.client.connect();
      this.isInitialized = true;
      console.log("Redis connection established successfully");
    } catch (error) {
      console.error("Failed to initialize Redis:", error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    if (!this.isInitialized) {
      return false;
    }

    try {
      await this.client.ping();
      return true;
    } catch (error) {
      console.error("Redis health check failed:", error);
      return false;
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async setEx(key: string, ttl: number, value: string): Promise<void> {
    await this.client.setEx(key, ttl, value);
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    await this.client.quit();
    this.isInitialized = false;
    console.log("Redis connection closed");
  }
}
