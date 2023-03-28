CREATE TABLE IF NOT EXISTS public.customers
(
    "firstName" character varying COLLATE pg_catalog."default",
    "lastName" character varying COLLATE pg_catalog."default",
    address character varying COLLATE pg_catalog."default",
    "pinCode" character varying COLLATE pg_catalog."default",
    "numberOfOrders" bigint,
    "customerId" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 9223372036854775807 CACHE 1 ),
    CONSTRAINT customers_pkey PRIMARY KEY ("customerId")
)

