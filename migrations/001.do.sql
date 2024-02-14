-- public.boms definition

-- Drop table

-- DROP TABLE public.boms;

CREATE TABLE public.boms (
	item text NOT NULL,
	"path" text NOT NULL,
	path_id text NOT NULL,
	"level" int4 NOT NULL,
	parent text NOT NULL,
	"type" text NULL,
	id int4 NULL,
	selection text NULL,
	t_n int4 NULL,
	quantity int4 NULL,
	revision text NULL,
	description text NULL,
	description_en text NOT NULL,
	spare_index text NULL,
	wbe text NULL,
	description_wbe text NULL,
	plant_id text NOT NULL,
 	tag text NULL,

  created_at timestamp(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(3) DEFAULT CURRENT_TIMESTAMP,

	"uuid" uuid NOT NULL DEFAULT gen_random_uuid(),
	CONSTRAINT bom_pkey PRIMARY KEY (uuid)
);

