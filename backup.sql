--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 16.0 (Ubuntu 16.0-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    type character varying(255) NOT NULL
);


ALTER TABLE public.auth OWNER TO postgres;

--
-- Name: auth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.auth_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    access jsonb NOT NULL,
    "limit" character varying(255) DEFAULT '10'::character varying NOT NULL,
    forlder character varying(255)
);


ALTER TABLE public.department OWNER TO postgres;

--
-- Name: department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.department ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: faculty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculty (
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "limit" integer DEFAULT 5 NOT NULL,
    folder character varying(255)
);


ALTER TABLE public.faculty OWNER TO postgres;

--
-- Name: favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite (
    id integer NOT NULL,
    user_id character varying(255) NOT NULL,
    items jsonb NOT NULL
);


ALTER TABLE public.favorite OWNER TO postgres;

--
-- Name: favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.favorite ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.file (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    access jsonb,
    owner character varying(255) NOT NULL,
    tags jsonb,
    privacy character varying(255) DEFAULT 'public'::character varying NOT NULL,
    category character varying(255) NOT NULL,
    date jsonb,
    size integer,
    bin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.file OWNER TO postgres;

--
-- Name: folder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.folder (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    child jsonb,
    date jsonb,
    size integer,
    bin boolean DEFAULT false NOT NULL,
    access jsonb,
    tags jsonb,
    category character varying(255),
    privacy character varying(255)
);


ALTER TABLE public.folder OWNER TO postgres;

--
-- Name: file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.folder ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: file_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.file_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.file_id_seq1 OWNER TO postgres;

--
-- Name: file_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.file_id_seq1 OWNED BY public.file.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    id integer NOT NULL,
    descripation character varying(255) NOT NULL,
    "from" character varying(255) NOT NULL,
    "to" character varying(255) NOT NULL,
    date character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    view boolean NOT NULL,
    doctype character varying(255) NOT NULL,
    path character varying(255)
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- Name: otp_verification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp_verification (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    otp character varying(255) NOT NULL,
    otp_expiry character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    type character varying(255) NOT NULL
);


ALTER TABLE public.otp_verification OWNER TO postgres;

--
-- Name: otp_verification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.otp_verification ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.otp_verification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.notification ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    create_time character varying(255) NOT NULL,
    fullname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    gender character varying(255) NOT NULL,
    mobile character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    verification boolean NOT NULL,
    image character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: file id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file ALTER COLUMN id SET DEFAULT nextval('public.file_id_seq1'::regclass);


--
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth (id, username, password, type) FROM stdin;
3	2021mc14an@mitsgwl.ac.in	$2b$10$gBJtj0gi3ogoO25bW.Not.ZllwGYWjpNnDcx2HGE0.c0f/JS1bjTe	student
4	anujrathor178@gmail.com	$2b$10$fqfDmTQOk0MR3/sFedW.SORNd6u0IzVJjY.QIJojWlINP7xMBe4l2	student
6	anujrathor091@gmail.com	$2b$10$IjzH9trSlxsYVzRhHiRa3OQiJDlEpfQvi0gCu9nFvvi9I3yNqVN1q	student
7	sharmapoornika93@gmail.com	$2b$10$JDukaXaLj7hI2A4N2TRNu.pEMwK8T7cY3dVrbzamXqVlQdbnOle4K	student
8	shivamsingh57680@gmail.com	$2b$10$8cyg38lZtscbXDoIbZJQSeO4acDyo/Izm4TYL.G3mOnBvzU5xvBxK	student
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department (id, name, access, "limit", forlder) FROM stdin;
\.


--
-- Data for Name: faculty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculty (email, name, "limit", folder) FROM stdin;
\.


--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorite (id, user_id, items) FROM stdin;
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.file (id, name, path, access, owner, tags, privacy, category, date, size, bin) FROM stdin;
\.


--
-- Data for Name: folder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.folder (id, name, path, owner, child, date, size, bin, access, tags, category, privacy) FROM stdin;
16	drive	/	super-admin	\N	\N	\N	f	\N	\N	\N	\N
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id, descripation, "from", "to", date, type, view, doctype, path) FROM stdin;
\.


--
-- Data for Name: otp_verification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otp_verification (id, email, otp, otp_expiry, password, type) FROM stdin;
18	something@gmail.com	652909	1698333605262	$2b$10$.MV7o4IWOX6RlDI/tfRJou/PA.ajHRt5FRHkLq0qPbCmenKNY82Iu	student
23	iabhikarneekhra50@gmail.com	803117	1698510282773	$2b$10$LJzot2RDbHnLZZfwsmXpOeEK5p7HxRug.75PBUzOCii9W0Pn4rQL.	student
24	iabhikarneekhra50@gmail.com	248044	1698510289363	$2b$10$4e.1xW7hDvtDSkefmZeXuuPIjdo.uOdmvcPkRl9m6s1e5OQwaME3.	student
25	iabhikarneekhra50@gmail.com	457351	1698510392340	$2b$10$i2GV7mvV2quqw.aHkQWTe.PU0NZ6pUb9TcizoBbbz64L5AB3qFAYe	student
26	iabhikarneekhra50@gmail.com	643069	1698510395980	$2b$10$4Miig7RrKyDmYPUZtXAF5OOj9w63hvLe1yJhBt93wu1dGEmshm6kS	student
27	iabhikarneekhra50@gmail.com	653223	1698511664937	$2b$10$oxd3twDftqznX0dQZ7Rm4eZMPnZTMe1otAWbe0WmV/sQ/vqPV5xN.	student
28	iabhikarneekhra50@gmail.com	592496	1698512041931	$2b$10$aC9Nqpq5o/nhY4bAi07Y.uQGS4nW8MHbqDLbr3FuXwtrIvseQsIpK	student
29	2021mc26ab@mitsgwl.ac.in	779363	1698512394809	$2b$10$0ecW9sOwxqGg2LGVu0gx1.//qszybMYgnf6XvGal1pENu2Pv107Cu	student
30	iabhikarneekhra50@gmail.com	944502	1698512948571	$2b$10$uTk4UM4ZZFoSQPxVXYC8Zec0yHVrZOYZk0pm2CMi/Vuduj19Tl5RC	student
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, create_time, fullname, email, gender, mobile, username, verification, image) FROM stdin;
13	1698261143202	Anuj Rathor	2021mc14an@mitsgwl.ac.in	male	7869714932	2021mc14an@mitsgwl.ac.in	t	\N
14	1698296909630	Anuj Rathor	anujrathor178@gmail.com	male	7869714932	anujrathor178@gmail.com	t	\N
16	1698333305260	something mishra	something@gmail.com	other	9425729589	something@gmail.com	f	\N
17	1698422508293	Anuj Rathor	anujrathor091@gmail.com	male	7869714932	anujrathor091@gmail.com	t	\N
18	1698427190377	Poornika Sharma	sharmapoornika93@gmail.com	female	9302659050	sharmapoornika93@gmail.com	t	\N
19	1698428467922	Shivam Singh	shivamsingh57680@gmail.com	male	7049579435	shivamsingh57680@gmail.com	t	\N
21	1698512648385	Abhikar Neekhra	iabhikarneekhra50@gmail.com	male	8109451749	iabhikarneekhra50@gmail.com	f	\N
\.


--
-- Name: auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_id_seq', 8, true);


--
-- Name: department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_id_seq', 1, false);


--
-- Name: favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorite_id_seq', 1, false);


--
-- Name: file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_id_seq', 16, true);


--
-- Name: file_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_id_seq1', 1, false);


--
-- Name: otp_verification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.otp_verification_id_seq', 30, true);


--
-- Name: request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.request_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- Name: auth auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_pkey PRIMARY KEY (id);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- Name: faculty faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty
    ADD CONSTRAINT faculty_pkey PRIMARY KEY (email);


--
-- Name: favorite favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY (id);


--
-- Name: folder file_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.folder
    ADD CONSTRAINT file_pkey PRIMARY KEY (id);


--
-- Name: file file_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT file_pkey1 PRIMARY KEY (id);


--
-- Name: otp_verification otp_verification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_verification
    ADD CONSTRAINT otp_verification_pkey PRIMARY KEY (id);


--
-- Name: notification request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT request_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

