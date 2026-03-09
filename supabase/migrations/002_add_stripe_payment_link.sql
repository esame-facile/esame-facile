-- Add Stripe Payment Link to products
ALTER TABLE products ADD COLUMN stripe_payment_link TEXT;

-- Make category_id optional (not all products need a category)
ALTER TABLE products ALTER COLUMN category_id DROP NOT NULL;
