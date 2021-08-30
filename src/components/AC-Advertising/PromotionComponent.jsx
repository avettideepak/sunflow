import React from "react"

export default function PromotionComponent() {
  // const bannerStyle = {
  //   backgroundColor: "#4b7dde",
  //   color: "#fff",
  //   height: "5vh",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "100%",
  //   clear: "both"
  // };
  // const textStyle = {
  //   padding: "0 10px 0 10px",
  //   lineHeight: "15px"
  // };

  // const [dataFromDrupal, setDataFromDrupal] = useState("");

  // const { loading, error, data } = useQuery(GET_NODE_BY_URL, {
  //   variables: { path: "/laptops" },
  //   pollInterval: 120000
  // });
  // useEffect(() => {
  //   if (!error && !loading) {
  //     setDataFromDrupal(data.route.entity.body.value);
  //   }
  // }, [data, error, loading]);

  // if (loading) return null;
  // if (error) return `Error! ${error}`;

  return (
    <React.Fragment>
      {/* <div className="promotion-block" style={bannerStyle}>
        <div
          style={textStyle}
          dangerouslySetInnerHTML={{ __html: dataFromDrupal }}
        />
      </div> */}
    </React.Fragment>
  )
}
