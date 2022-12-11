import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User, UserRole } from '../models/user.model';
import { FilterOptions } from '../repos/interfaces/filter-options.interface';
import { UserRepository } from '../repos/interfaces/user.repo';
import { UsersService } from './users.service';

class DummyUserRepository implements UserRepository {
    save(user: User): Promise<User> {
        return Promise.resolve(user);
    }
    existsById(id: number): Promise<boolean> {
        return Promise.resolve(false);
    }
    existsByLogin(login: string): Promise<boolean> {
        return Promise.resolve(false);
    }
    findAll(): Promise<User[]> {
        return Promise.resolve([]);
    }
    findById(id: number): Promise<User> {
        return Promise.resolve({} as User);
    }
    findByLogin(login: string): Promise<User> {
        return Promise.resolve({} as User);
    }
    findFiltered(opts: FilterOptions): Promise<User[]> {
        return Promise.resolve([]);
    }
    delete(id: number): Promise<void> {
        return Promise.resolve();
    }
}

describe('UsersService', () => {
    let usersService: UsersService;
    let dummyRepo: DummyUserRepository;

    beforeEach(async () => {
        let module = await Test.createTestingModule({
            providers: [UsersService]
        }).useMocker(token => {
            if (token == UserRepository) {
                dummyRepo = new DummyUserRepository();
                return dummyRepo;
            }
        }).compile();

        usersService = module.get<UsersService>(UsersService);
    });

    describe('create', () => {
        it('creates user with encrypted password', async () => {
            let user: User = { first_name: 'John', last_name: 'Doe', login: 'login', password: 'password', role: UserRole.STUDENT };
            let password = user.password;

            let res = await usersService.create(user);

            expect(res.password).not.toEqual(password);
        });

        it('fails when login is empty', async () => {
            let user: User = { first_name: 'John', last_name: 'Doe', login: '', password: 'password', role: UserRole.STUDENT };

            jest.spyOn(dummyRepo, 'save')
                .mockRejectedValueOnce(new ConflictException());

            await expect(usersService.create(user)).rejects.toThrow();
        });

        it('fails when login already exists', async () => {
            let user1: User = { first_name: 'John', last_name: 'Doe', login: 'login', password: 'password', role: UserRole.STUDENT };
            let user2: User = { first_name: 'Jack', last_name: 'Wien', login: 'login', password: 'password', role: UserRole.TUTOR };

            jest.spyOn(dummyRepo, 'save')
                .mockResolvedValueOnce(user1)
                .mockRejectedValueOnce(new ConflictException());

            await usersService.create(user1);

            await expect(usersService.create(user2)).rejects.toThrow();
        });
    });
});