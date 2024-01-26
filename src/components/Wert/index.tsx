import WertModule from "@wert-io/module-react-component";

const Wert = ({ walletAddress }: { walletAddress: string }) => {
  return (
    <WertModule
      className='w-screen h-screen'
      options={{
        partner_id: process.env.WERT_PARTNER_ID!,
        origin: process.env.WERT_ORIGIN!,
        theme: "white",
        commodities: "ATF",
        commodity_amount: 1,
        address: walletAddress,
        listeners: {
          error: (name: any, message: any) =>
            alert(JSON.stringify(name + message)),
        },
      }}
    />
  );
};

export default Wert;
