interface IEnvironment {
    port: number;
    secretKey: string;
    getCurrentEnvironment(): string;
    setEnvironment(env: string): void;
    isProductionEnvironment(): boolean;
    isDevEnvironment(): boolean;
    isTestEnvironment(): boolean;
    isStagingEnvironment(): boolean;
}

export default IEnvironment;
