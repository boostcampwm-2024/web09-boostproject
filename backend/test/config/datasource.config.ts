import { DataSource } from 'typeorm';
import { CustomNamingStrategy } from '@src/config/CustomNamingStrategy';
import { StartedMySqlContainer } from '@testcontainers/mysql';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const initDataSource = async (container: StartedMySqlContainer) => {
  const dataSource = new DataSource({
    type: 'mysql',
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getUserPassword(),
    database: container.getDatabase(),
    entities: [__dirname + '/../../src/**/entity/*.{ts,js}'],
    synchronize: false,
    namingStrategy: new CustomNamingStrategy(),
  });
  await dataSource.initialize();
  return addTransactionalDataSource(dataSource);
};
