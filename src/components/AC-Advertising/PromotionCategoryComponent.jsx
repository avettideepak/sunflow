import React, { useState, useEffect } from "react"

export default function PromotionCategoryComponent(props) {
  /*  const styleBlock = {
        backgroundColor: 'white',
        borderRadius: '7px 7px 7px 7px',
        padding: '20px',
        background: 'rgba(255,255,255,0.6)',
    }
    // remove /preview from the url
    const PREPARED_PROPS = props.categoryUrl.substring(8)
    const [dataFromDrupal, setDataFromDrupal] = useState("");

    const { loading, error, data } = useQuery(GET_NODE_BY_URL, {
        variables: {"path": PREPARED_PROPS},
        pollInterval: 120000,
    });
    useEffect(() => {
        if(!error && !loading) {
            setDataFromDrupal(data.route.entity.body.value);
        }
    }, [data, error, loading])

    if (loading) return null;
    if (error) return `Error! ${error}`;
 */
  return (
    <React.Fragment>
      {/*    <div className="promotion-block">
                <div style={styleBlock} dangerouslySetInnerHTML={{ __html: dataFromDrupal}}/>
            </div> */}
    </React.Fragment>
  )
}
