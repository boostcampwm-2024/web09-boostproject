import { FindManyOptions, Repository, FindOptionsWhere } from 'typeorm';
import { SoftDeletableEntity } from './SoftDeletableEntity.interface';

/**
 * Soft Delete 를 지원
 * 기본적으로 deletedAt 이 null 인 것만 조회
 */
export abstract class SoftDeleteRepository<
  T extends SoftDeletableEntity<K>,
  K,
> extends Repository<T> {
  find(options: FindManyOptions<T> = {}) {
    return super.find({
      ...options,
      where: this.applyDeletedAtCondition(options.where),
    });
  }

  findById(id: K) {
    return this.findOne({
      where: this.applyDeletedAtCondition({ id } as FindOptionsWhere<T>),
    });
  }

  findAndCount(options: FindManyOptions<T> = {}) {
    return super.findAndCount({
      ...options,
      where: this.applyDeletedAtCondition(options.where),
    });
  }

  count(options: FindManyOptions<T> = {}): Promise<number> {
    return super.count({
      ...options,
      where: this.applyDeletedAtCondition(options.where),
    });
  }

  findOne(options: FindManyOptions<T> = {}) {
    return super.findOne({
      ...options,
      where: this.applyDeletedAtCondition(options.where),
    });
  }

  softDelete(id: number) {
    return super.update(id, { deletedAt: new Date() } as any);
  }

  private applyDeletedAtCondition(where: any) {
    if (Array.isArray(where)) {
      return where.map((condition) => ({ ...condition, deletedAt: null }));
    }
    return { ...where, deletedAt: null };
  }
}
