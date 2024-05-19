--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

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
    folder character varying(255),
    username character varying(255) NOT NULL
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
-- Name: downloads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.downloads (
    id integer NOT NULL,
    date character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    username character varying(255) DEFAULT 'Anonymous'::character varying
);


ALTER TABLE public.downloads OWNER TO postgres;

--
-- Name: downloads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.downloads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.downloads_id_seq OWNER TO postgres;

--
-- Name: downloads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.downloads_id_seq OWNED BY public.downloads.id;


--
-- Name: faculty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculty (
    username character varying(255) NOT NULL,
    "limit" integer DEFAULT 5 NOT NULL,
    folder character varying(255)
);


ALTER TABLE public.faculty OWNER TO postgres;

--
-- Name: favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    path character varying(255) NOT NULL
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
    access character varying(255),
    owner character varying(255) NOT NULL,
    tags character varying(255),
    privacy character varying(255) DEFAULT 'public'::character varying NOT NULL,
    category character varying(255),
    date character varying(255),
    bin boolean DEFAULT false NOT NULL,
    parent character varying(255),
    type character varying(255),
    shared jsonb,
    size numeric DEFAULT 0
);


ALTER TABLE public.file OWNER TO postgres;

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


ALTER TABLE public.file_id_seq1 OWNER TO postgres;

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
    image character varying(255),
    department character varying(255),
    batch character varying(255)
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
-- Name: viewed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.viewed (
    id integer NOT NULL,
    date character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    username character varying(255) DEFAULT 'Anonymous'::character varying
);


ALTER TABLE public.viewed OWNER TO postgres;

--
-- Name: viewed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.viewed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.viewed_id_seq OWNER TO postgres;

--
-- Name: viewed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.viewed_id_seq OWNED BY public.viewed.id;


--
-- Name: downloads id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.downloads ALTER COLUMN id SET DEFAULT nextval('public.downloads_id_seq'::regclass);


--
-- Name: file id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file ALTER COLUMN id SET DEFAULT nextval('public.file_id_seq1'::regclass);


--
-- Name: viewed id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viewed ALTER COLUMN id SET DEFAULT nextval('public.viewed_id_seq'::regclass);


--
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth (id, username, password, type) FROM stdin;
6	anujrathor091@gmail.com	$2b$10$IjzH9trSlxsYVzRhHiRa3OQiJDlEpfQvi0gCu9nFvvi9I3yNqVN1q	student
7	sharmapoornika93@gmail.com	$2b$10$JDukaXaLj7hI2A4N2TRNu.pEMwK8T7cY3dVrbzamXqVlQdbnOle4K	student
8	shivamsingh57680@gmail.com	$2b$10$8cyg38lZtscbXDoIbZJQSeO4acDyo/Izm4TYL.G3mOnBvzU5xvBxK	student
3	2021mc14an@mitsgwl.ac.in	$2b$10$gBJtj0gi3ogoO25bW.Not.ZllwGYWjpNnDcx2HGE0.c0f/JS1bjTe	admin
9	anujrathor178@gmail.com	$2b$10$rQ5SpToOQv/2X6VE4z6LFezBtZ/IxFEL2B7fnSdDxHr/wseN8gVIC	student
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department (id, name, access, "limit", folder, username) FROM stdin;
\.


--
-- Data for Name: downloads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.downloads (id, date, path, username) FROM stdin;
2	2023-11-20 03:20:32.543363+05:30	/43b09433-051	\N
\.


--
-- Data for Name: faculty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculty (username, "limit", folder) FROM stdin;
\.


--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorite (id, username, path) FROM stdin;
307	2021mc14an@mitsgwl.ac.in	/fcfc4f
310	2021mc14an@mitsgwl.ac.in	/c4260a
311	2021mc14an@mitsgwl.ac.in	/c64eec
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.file (id, name, path, access, owner, tags, privacy, category, date, bin, parent, type, shared, size) FROM stdin;
10	jhjwadhw	/cafe79	ss	2021mc14an@mitsgwl.ac.in	\N	private	category1	2023-11-17T21:34:34.441+05:30	f	/	folder	\N	0
17	Anuj Rathor3	/786330		2021mc14an@mitsgwl.ac.in	sgs	private	category2	2023-11-17T23:02:56.184+05:30	f	/	folder	{"access": [{"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Shivam Singh", "email": "shivamsingh57680@gmail.com"}, {"name": "Anuj Rathor", "email": "2021mc14an@mitsgwl.ac.in"}, {"name": "Anuj Rathor", "email": "anujrathor091@gmail.com"}]}	0
9	jhjwad	/c64eec	ss	2021mc14an@mitsgwl.ac.in	jsd	private	category1	2023-11-17T21:33:38.573+05:30	f	/	folder	\N	0
14	jjes	/b18f7fb0-111	\N	2021mc14an@mitsgwl.ac.in	jd	private	category1	2023-11-17T22:25:58.493+05:30	f	/	json	\N	3268
18	timeperiod	/32d90cb5-1eb	ss,sss,dfs	2021mc14an@mitsgwl.ac.in	dg	private	category1	2023-11-17T23:11:52.797+05:30	f	/	jpg	\N	313728
15	te	/7c384fb8-160	mac	2021mc14an@mitsgwl.ac.in	tag1	private	documents	2023-11-17T22:35:30.204+05:30	f	/	json	\N	3268
12	test file2	/c8735cbc-bbb	mac	2021mc14an@mitsgwl.ac.in	tag1	private	documents	2023-11-17T22:11:20.712+05:30	f	/	json	\N	3268
2	Test Folder	/e1bed8	mac-2021,cse	2021mc14an@mitsgwl.ac.in	tag1	private	category2	2023-11-16T17:33:55.640+05:30	f	/	folder	{"access": [{"name": "Anuj Rathor", "email": "anujrathor178@gmail.com"}, {"name": "Shivam Singh", "email": "shivamsingh57680@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Anuj Rathor", "email": "anujrathor091@gmail.com"}, {"name": "something mishra", "email": "something@gmail.com"}]}	0
16	id	/7ae1825d-df2	hj	2021mc14an@mitsgwl.ac.in	hd	private	category1	2023-11-17T22:53:34.047+05:30	f	/	22	\N	123299
11	Anuj Rathor	/b63dcd	\N	2021mc14an@mitsgwl.ac.in	\N	private	category1	2023-11-17T21:36:10.673+05:30	f	/	folder	{"access": [{"name": "Anuj Rathor", "email": "2021mc14an@mitsgwl.ac.in"}, {"name": "Anuj Rathor", "email": "anujrathor091@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}]}	0
13	sabpaise	/b9716867-48f	\N	2021mc14an@mitsgwl.ac.in	w	private	category1	2023-11-17T22:12:31.399+05:30	t	/	json	\N	3268
20	image	/175f8301-bf1	\N	2021mc14an@mitsgwl.ac.in	hj	public	category1	2023-11-18T16:35:55.838+05:30	f	/	\N	\N	5728
19	aa	/fcfc4f		2021mc14an@mitsgwl.ac.in	ds	public	category1	2023-11-18T16:06:59.804+05:30	t	/	folder	{"access": [{"name": "Anuj Rathor", "email": "2021mc14an@mitsgwl.ac.in"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}]}	0
1	root	/	admin	admin	\N	private	\N	\N	f	\N	folder	{"access": [{"name": "Shivam Singh", "email": "shivamsingh57680@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"name": "Poornika Sharma", "email": "sharmapoornika93@gmail.com"}, {"email": "something@gmail.com"}, {"email": "anujrathor091@gmail.com"}, {"email": "iabhikarneekhra50@gmail.com"}, {"email": "2021mc14an@mitsgwl.ac.in"}, {"email": "anujrathor178@gmail.com"}]}	586735
25	Anuj Rat	/c4260a		2021mc14an@mitsgwl.ac.in	ajs%#$sdja%#$msdjsd%#$nsdjds%#$ndskds%#$nsdnds%#$nsdndsndsnsd%#$nsdndsn%#$jdsjds%#$nnds%#$nndsn%#$ndnsd	public	category1	2023-11-19T01:23:19.613+05:30	f	/	folder	{"access": [{"name": "Anuj Rathor", "email": "anujrathor178@gmail.com"}, {"name": "Abhikar Neekhra", "email": "iabhikarneekhra50@gmail.com"}, {"name": "Anuj Rathor", "email": "2021mc14an@mitsgwl.ac.in"}]}	0
28	je	/c4260a/435e9c	\N	2021mc14an@mitsgwl.ac.in	\N	restricted	category3	2023-11-19T15:48:14.781+05:30	f	/c4260a	folder	{"access": [{"name": "Anuj Rathor", "email": "2021mc14an@mitsgwl.ac.in"}, {"name": "Shivam Singh", "email": "shivamsingh57680@gmail.com"}]}	0
29	Loki	/f4724c		2021mc14an@mitsgwl.ac.in	movie	public	other	2023-11-20T12:35:59.988+05:30	f	/	folder	\N	0
30	sds	/172931		2021mc14an@mitsgwl.ac.in	dss	public	notices	2023-11-20T12:56:00.765+05:30	f	/	folder	\N	0
31	hsks	/be51a7		2021mc14an@mitsgwl.ac.in	hdh	public	other	2023-11-20T12:56:58.874+05:30	f	/	folder	\N	1008513552
32	playlist	/be51a7/f8be60c9-d99	\N	2021mc14an@mitsgwl.ac.in	movie	public	other	2023-11-20T13:01:00.053+05:30	f	/be51a7	mkv	\N	1008513552
23	timeperiodz	/dbceeda0-c8d	\N	2021mc14an@mitsgwl.ac.in	nx	public	category1	2023-11-18T16:39:09.451+05:30	t	/	png	\N	59571
22	jzx;pAnuj Rathor	/65e66d		2021mc14an@mitsgwl.ac.in	jnxc	public	category2	2023-11-18T16:38:26.973+05:30	f	/	folder	\N	0
24	nnx	/7643e4		2021mc14an@mitsgwl.ac.in	nx	public	category2	2023-11-18T16:41:37.051+05:30	f	/	folder	\N	0
21	location	/43b09433-051	\N	2021mc14an@mitsgwl.ac.in	hbjjk	public	category1	2023-11-18T16:36:31.996+05:30	f	/	jpg	\N	71337
26	locationk	/c8a4b2	sss	2021mc14an@mitsgwl.ac.in		restricted	category1	2023-11-19T01:56:39.824+05:30	f	/	folder	\N	0
27	jjd	/68e7c2		2021mc14an@mitsgwl.ac.in	jdj	public	category2	2023-11-19T15:28:21.329+05:30	f	/	folder	\N	0
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

COPY public.users (id, create_time, fullname, email, gender, mobile, username, verification, image, department, batch) FROM stdin;
16	1698333305260	something mishra	something@gmail.com	other	9425729589	something@gmail.com	f	\N	\N	\N
17	1698422508293	Anuj Rathor	anujrathor091@gmail.com	male	7869714932	anujrathor091@gmail.com	t	\N	\N	\N
18	1698427190377	Poornika Sharma	sharmapoornika93@gmail.com	female	9302659050	sharmapoornika93@gmail.com	t	\N	\N	\N
19	1698428467922	Shivam Singh	shivamsingh57680@gmail.com	male	7049579435	shivamsingh57680@gmail.com	t	\N	\N	\N
21	1698512648385	Abhikar Neekhra	iabhikarneekhra50@gmail.com	male	8109451749	iabhikarneekhra50@gmail.com	f	\N	\N	\N
13	1698261143202	Anuj Rathor	2021mc14an@mitsgwl.ac.in	male	7869714932	2021mc14an@mitsgwl.ac.in	t	/drive/photos/2021mc14an@mitsgwl.ac.in	\N	\N
23	1700155951035	Anuj Rathor	anujrathor178@gmail.com	male	7869714932	anujrathor178@gmail.com	t	/drive/photos/anujrathor178	female	
\.


--
-- Data for Name: viewed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.viewed (id, date, path, username) FROM stdin;
1	2023-11-20 03:20:42.422423+05:30	/43b09433-051	\N
2	2023-11-20 03:20:44.276029+05:30	/43b09433-051	\N
3	2023-11-20 03:21:01.591814+05:30	/43b09433-051	\N
4	2023-11-20 03:21:09.111708+05:30	/32d90cb5-1eb	\N
5	2023-11-20 03:22:01.507465+05:30	/32d90cb5-1eb	\N
6	2023-11-20 03:22:08.697262+05:30	/32d90cb5-1eb	\N
7	2023-11-20 03:22:35.875475+05:30	/32d90cb5-1eb	\N
8	2023-11-20 03:22:37.391505+05:30	/32d90cb5-1eb	\N
9	2023-11-20 03:22:41.504103+05:30	/32d90cb5-1eb	\N
10	2023-11-20 03:22:46.525664+05:30	/32d90cb5-1eb	\N
11	2023-11-20 03:23:05.06528+05:30	/32d90cb5-1eb	\N
12	2023-11-20 03:24:03.39549+05:30	/43b09433-051	\N
13	2023-11-20 03:24:06.53057+05:30	/32d90cb5-1eb	\N
14	2023-11-20 12:04:45.7614+05:30	/43b09433-051	2021mc14an@mitsgwl.ac.in
15	2023-11-20 13:01:05.860316+05:30	/be51a7/f8be60c9-d99	2021mc14an@mitsgwl.ac.in
16	2023-11-20 13:02:16.781695+05:30	/be51a7/f8be60c9-d99	2021mc14an@mitsgwl.ac.in
17	2023-11-20 13:03:08.660853+05:30	/43b09433-051	2021mc14an@mitsgwl.ac.in
18	2023-11-20 13:15:29.252738+05:30	/be51a7/f8be60c9-d99	2021mc14an@mitsgwl.ac.in
\.


--
-- Name: auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_id_seq', 9, true);


--
-- Name: department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_id_seq', 1, false);


--
-- Name: downloads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.downloads_id_seq', 2, true);


--
-- Name: favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorite_id_seq', 311, true);


--
-- Name: file_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_id_seq1', 32, true);


--
-- Name: otp_verification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.otp_verification_id_seq', 32, true);


--
-- Name: request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.request_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 23, true);


--
-- Name: viewed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.viewed_id_seq', 18, true);


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
-- Name: downloads downloads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.downloads
    ADD CONSTRAINT downloads_pkey PRIMARY KEY (id);


--
-- Name: faculty faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty
    ADD CONSTRAINT faculty_pkey PRIMARY KEY (username);


--
-- Name: favorite favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY (id);


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
-- Name: viewed viewed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viewed
    ADD CONSTRAINT viewed_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

