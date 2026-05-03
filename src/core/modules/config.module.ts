import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import appConfig from '../../app.config';

function envPaths(): string[] {
    const env = process.env.NODE_ENV ?? 'local';
    return [
        `.env.${env}.local`, // highest priority for that env
        `.env.${env}`,       // then base env file
        `.env`,              // finally generic defaults
    ];
}

function validateEnv(config: Record<string, any>) {
    const allowed = new Set(['local', 'development', 'production']);
    if (config.NODE_ENV && !allowed.has(config.NODE_ENV)) {
        throw new Error(`NODE_ENV must be one of ${[...allowed].join(', ')}`);
    }
    config.PORT ??= '3000';
    config.WORKERS ??= '';
    return config;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
            envFilePath: envPaths(),
            load: [appConfig],
            validate: validateEnv,
        }),
    ],
})
export class AppConfigModule {
}
