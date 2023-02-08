-- create read-only user
create role root_ro WITH LOGIN PASSWORD 'root_ro' nosuperuser inherit nocreatedb nocreaterole noreplication valid until 'infinity';

-- assign permission to this read-only user
grant connect on database eagool to root_ro;
grant usage on schema public to 'root_ro';
grant select on all tables in schema public to 'root_ro';
grant select on all sequences in schema public to 'root_ro';
revoke create on schema public from 'root_ro';

-- assign permissions to read all newly tables created in the future
alter default privileges in schema public grant select on tables to 'root_ro';
