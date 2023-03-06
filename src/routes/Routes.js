
import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Loader from "../component/Loader";
import Footer from "../component/Footer";
import Layout from "../layout/Layout";

import { menuRoutes } from "./index";
import { useUser } from '../providers/UserProvider'
import { useHistory } from "react-router";
const Routes = () => {
  
  const history = useHistory();
  const {isAdmin} = useUser();
  useEffect(() => {
    console.log(window.location.pathname);
    if (isAdmin !== true && window.location.pathname === '/admin-mint')
    {
      console.log('history',isAdmin)
      history.push('/admin-login');

    }
      
  },[isAdmin,history])
  
  return (
    <Suspense fallback={Loader}>
      <Switch>
        {menuRoutes.map(({ path, component: Component, layout }, index) => (
          <Route
            key={index}
            path={path}
            exact
            render={(props) => (
              <Layout bg={layout}>
                <>
                  <Component {...props} />
                  <Footer />
                </>
              </Layout>
            )}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
