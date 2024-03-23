import { useEffect, useState } from "react";
import { BigNumber } from "ethers";

const useDomain = (domainName: string) => {
  const [resolvedAddress, setResolvedAddress] = useState<any[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const networkEnv = process.env.NEXT_PUBLIC_NETWORK;

  useEffect(() => {
    setLoading(true);
    const fetchDomain = async () => {
      try {
        const graphqlQuery = {
          query: `
            query GetDomainByName($name: String!) {
              domains(where: { name: $name }) {
                addr {
                  id
                }
              }
            }
          `,
          variables: {
            name: domainName,
          },
        };

        const graphqlResponse = await fetch(
          "https://proxy-production-8e85.up.railway.app/https://subgraph.defichain-domains.com/subgraphs/name/defichaindomains/subgraph",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(graphqlQuery),
          }
        );
        const { data } = await graphqlResponse.json();

        if (data.domoins[0]) {
          const address = 
        }
       
        setResolvedAddress(nfts);
      } catch (error) {
        console.error("Error fetching nfts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [networkEnv, collectionAddress]);
  return { nfts, loading };
};

export default useDomain;
