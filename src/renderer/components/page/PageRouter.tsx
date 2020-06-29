import React, { FC, useState, useEffect } from 'react';
import { RouteProps, Redirect } from 'react-router-dom';
import { PageRecord } from '@common/queries';
import { pageHooks } from '@renderer/store/root_store';
import { withTopMenu } from '@renderer/components/nav/top_menu';

const extractPage = (url: string) => {
  return url.substr(6);
};

export const _PageRouter: FC<RouteProps> = ({ location }) => {
  if (!location || location.pathname === '') {
    // TODO: Add error message that the page couldn't be found
    return <Redirect to='/page-index' />;
  }
  const slug = extractPage(location.pathname);
  const [ page, setPage ] = useState<PageRecord>();

  useEffect(() => {
    pageHooks.getPageBySlug(slug).then(page => setPage(page));
  }, [ slug ]);

  if (!page) {
    // TODO: Add loading
    return null;
  }

  return (
    <div>
      <h2>{page.title}</h2>
      <article>{page.content}</article>
    </div>
  );
};

export const PageRouter = withTopMenu(_PageRouter);
