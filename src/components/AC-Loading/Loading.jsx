import React from "react";

import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/core/styles/withStyles";

export default function Loading() {
  const [completed, setCompleted] = React.useState(0);

  const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: "#ff0"
    },
    barColorPrimary: {
      backgroundColor: "#ff0"
    }
  })(LinearProgress);
  React.useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setTimeout(progress, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <LinearProgress
        color="primary"
        variant="indeterminate"
        value={completed}
        className="LinearPro"
      />
      {/* <img src={loader} /> */}
    </div>
  );
}
