// src/services/DatabaseService.ts
import { PostgresRepository } from "./PostgresRepository";
import { RedisRepository } from "./RedisRepository";

export class DatabaseService {
  private static instance: DatabaseService;
  private postgresRepo: PostgresRepository;
  private redisRepo: RedisRepository;
  private isInitialized = false;

  private constructor() {
    this.postgresRepo = PostgresRepository.getInstance();
    this.redisRepo = RedisRepository.getInstance();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log("Database service already initialized");
      return;
    }

    try {
      await Promise.all([
        this.postgresRepo.initialize(),
        this.redisRepo.initialize()
      ]);
      this.isInitialized = true;
      console.log("All database connections established successfully");
    } catch (error) {
      console.error("Failed to initialize database connections:", error);
      throw error;
    }
  }

  public async healthCheck(): Promise<{
    postgres: boolean;
    redis: boolean;
  }> {
    const [postgresHealth, redisHealth] = await Promise.all([
      this.postgresRepo.healthCheck(),
      this.redisRepo.healthCheck()
    ]);

    return {
      postgres: postgresHealth,
      redis: redisHealth
    };
  }

  public async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    try {
      await Promise.all([
        this.postgresRepo.shutdown(),
        this.redisRepo.shutdown()
      ]);
      this.isInitialized = false;
      console.log("All database connections closed successfully");
    } catch (error) {
      console.error("Error during database shutdown:", error);
      throw error;
    }
  }
}
