import { Test } from '@nestjs/testing';
import { User, UserRole } from './../../models/user.model';
import { TypeORMUserRepository } from './user.repo';

describe('TypeORMUserRepo', () => {
    let repo: TypeORMUserRepository;

    beforeEach(async () => {
        let module = await Test.createTestingModule({
            providers: [
                TypeORMUserRepository
            ]
        })
            .useMocker((token) => {
                if (token == 'UserEntityRepository') {
                    let obj = {
                        id: 0,
                        users: [] as User[],
                        create: jest.fn().mockImplementation(u => u),
                        save: jest.fn().mockImplementation((user: User) => {
                            user.id = obj.id;
                            obj.id++;
                            obj.users.push(user);
                            return user;
                        }),
                        findAll: jest.fn().mockImplementation(async () => obj.users),
                        countBy: jest.fn().mockImplementation(async prop => {
                            if ('id' in prop) {
                                return obj.users.filter((u: User) => u.id == prop.id).length;
                            } else if ('login' in prop) {
                                return obj.users.filter((u: User) => u.login == prop.login).length;
                            }
                            return 0;
                        }),
                        find: jest.fn().mockReturnValue([]),
                    };
                    return obj;
                }
            })
            .compile();

        repo = module.get<TypeORMUserRepository>(TypeORMUserRepository);
    });

    describe('save', () => {
        it('should save users', async () => {
            let user1: User = { first_name: 'John', last_name: 'Doe', login: 'login', password: 'password', role: UserRole.STUDENT };
            let user2: User = { first_name: 'Jack', last_name: 'Wien', login: 'login2', password: 'password', role: UserRole.TUTOR };

            await expect(repo.save(user1)).resolves.toEqual({ ...user1, id: 0 });
            await expect(repo.save(user2)).resolves.toEqual({ ...user2, id: 1 });
        });

        it('fail on empty login', async () => {
            let user: User = { first_name: 'John', last_name: 'Doe', login: '', password: 'password', role: UserRole.STUDENT };

            await expect(repo.save(user)).rejects.toThrow();
        });

        it('fail on existing login', async () => {
            let user1: User = { first_name: 'John', last_name: 'Doe', login: 'login', password: 'password', role: UserRole.STUDENT };
            let user2: User = { first_name: 'Jack', last_name: 'Wien', login: 'login', password: 'password', role: UserRole.TUTOR };

            await expect(repo.save(user1)).resolves.toEqual({ ...user1, id: 0 });
            await expect(repo.save(user2)).rejects.toThrow();
        });
    });

    describe('findAll', () => {
        it('returns empty at first', async () => {
            await expect(repo.findAll()).resolves.toEqual([]);
        });

        // it('finds saved users', async () => {
        //     let user1: User = { first_name: 'John', last_name: 'Doe', login: 'login', password: 'password', role: UserRole.STUDENT };
        //     let user2: User = { first_name: 'Jack', last_name: 'Wien', login: 'login', password: 'password', role: UserRole.TUTOR };

        //     user1 = await repo.save(user1);
        //     user2 = await repo.save(user2);

        //     await expect(repo.findAll()).resolves.toEqual([user1, user2]);
        // });
    });
});
