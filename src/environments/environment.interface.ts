interface IEnvironment {
      port: number;
      secretKey: string;
      secretPeriod: string;
      refreshKey: string;
      refreshPeriod: string;
      getCurrentEnvironment(): string;
      setEnvironment(env: string): void;
      isProductionEnvironment(): boolean;
      isDevEnvironment(): boolean;
      isTestEnvironment(): boolean;
      isStagingEnvironment(): boolean;
}

export default IEnvironment;
