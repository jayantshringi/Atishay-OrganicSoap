-- ==============================================================================
-- SUPABASE SECURITY ADVISOR FIXES
-- Project: Atishay Organic Soap (atishay-organic-soap)
-- Fixes:
--   1. RLS Disabled in Public on profiles, products, orders, reviews (4 Errors)
--   2. Function Search Path Mutable on public.handle_new_user (1 Warning)
--   3. Public / Anon Can Execute SECURITY DEFINER Function on public.handle_new_user (1 Warning)
--   4. Signed-In Users Can Execute SECURITY DEFINER Function on public.handle_new_user (1 Warning)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. FIX FUNCTION SECURITY WARNINGS (public.handle_new_user)
-- ------------------------------------------------------------------------------

-- Pin the search_path to 'public' to prevent search_path hijacking
ALTER FUNCTION public.handle_new_user() SET search_path = public;

-- Revoke RPC EXECUTE privilege from public, anon, and authenticated roles.
-- Triggers on auth.users will continue to execute automatically with owner privileges.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;


-- ------------------------------------------------------------------------------
-- 2. ENABLE ROW LEVEL SECURITY (RLS) ON EXPOSED TABLES
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;


-- ------------------------------------------------------------------------------
-- 3. CONFIGURE RLS POLICIES
-- ------------------------------------------------------------------------------

-- === TABLE: public.profiles ===
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);


-- === TABLE: public.products ===
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

-- Public catalog browsing (anonymous and logged-in users)
CREATE POLICY "Products are viewable by everyone"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Product management restricted to admin accounts (or service_role which bypasses RLS)
CREATE POLICY "Admins can insert products"
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON public.products
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON public.products
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- === TABLE: public.orders ===
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Allow placing orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- Customers can view only their own orders
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all orders across customers
CREATE POLICY "Admins can view all orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Both logged-in users and guest checkouts can insert orders
CREATE POLICY "Allow placing orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- Admins can update order status and fulfillment details
CREATE POLICY "Admins can update orders"
  ON public.orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- === TABLE: public.reviews ===
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can submit reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users or admins can delete reviews" ON public.reviews;

-- Anyone can read product reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Logged-in customers can submit reviews
CREATE POLICY "Authenticated users can submit reviews"
  ON public.reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Customers can update their own reviews
CREATE POLICY "Users can update their own reviews"
  ON public.reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Review authors and admins can delete reviews
CREATE POLICY "Users or admins can delete reviews"
  ON public.reviews
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
