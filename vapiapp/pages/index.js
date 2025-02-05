import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {Assistant} from "../components/app/assistant";
import {Inter} from "next/font/google";
import Vapi from "@vapi-ai/web";

const inter = Inter({ subsets: ["latin"] });


const Home = () => {
      const router = useRouter();
      const {officeId} = router.query;

      const [vapiConnection, setVapiConnection] = useState(null);  // State to store office data
      const [office, setOffice] = useState(null);  // State to store office data
      const [loading, setLoading] = useState(true);  // State to handle loading status
      const [error, setError] = useState(null);  // State to handle errors

      useEffect(() => {
          if (!officeId) return;
          console.log(officeId);

          async function fetchOfficeToken() {
              try {
                  setLoading(true);

                  const response = await fetch(`/api/office/${officeId}`);
                  if (!response.ok) {
                      throw new Error(`HTTP Error! Status: ${response.status}`);
                  }

                  const officeData = await response.json();

                  if (officeData) {
                    const vapi = new Vapi(officeData?.token);

                    setOffice(officeData);
                    setVapiConnection(vapi);
                  } else {
                      throw new Error("Vapi credentials not found");
                  }

              } catch (error) {
                  console.error('Error fetching office:', error);
                  setError(error);
              } finally {
                  setLoading(false);
              }
          }

          fetchOfficeToken();

          }, [officeId]
      );

      if (loading) {
        return <div>Loading...</div>;  // Display loading state
      }

      if (error) {
        return <div>Error: {error}</div>;  // Display error state
      }

      if (!office) {
        return <div>No office found</div>;  // Display if no office data is found
      }

      return (
          <main
              className={`flex min-h-screen flex-col items-center justify-center p-12 ${inter.className}`}
          >
            <Assistant
                error={error}
                loading={loading}
                office={office}
                vapi={vapiConnection}
            />
          </main>
      );

    }
;

export default Home;