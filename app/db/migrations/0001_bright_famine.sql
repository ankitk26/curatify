ALTER TABLE "account" RENAME TO "curatify_account";--> statement-breakpoint
ALTER TABLE "session" RENAME TO "curatify_session";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "curatify_user";--> statement-breakpoint
ALTER TABLE "verification" RENAME TO "curatify_verification";--> statement-breakpoint
ALTER TABLE "curatify_session" DROP CONSTRAINT "session_token_unique";--> statement-breakpoint
ALTER TABLE "curatify_user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "curatify_account" DROP CONSTRAINT "account_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "curatify_session" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "curatify_account" ADD CONSTRAINT "curatify_account_user_id_curatify_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."curatify_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curatify_session" ADD CONSTRAINT "curatify_session_user_id_curatify_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."curatify_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curatify_session" ADD CONSTRAINT "curatify_session_token_unique" UNIQUE("token");--> statement-breakpoint
ALTER TABLE "curatify_user" ADD CONSTRAINT "curatify_user_email_unique" UNIQUE("email");