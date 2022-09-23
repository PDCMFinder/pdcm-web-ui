import { useEffect, FunctionComponent } from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";

const ScrollToTop: FunctionComponent<{ history: History }> = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

export default withRouter(ScrollToTop);
