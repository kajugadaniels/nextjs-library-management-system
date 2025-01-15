import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">{children}</section>
    </main>
  );
};
export default Layout;
