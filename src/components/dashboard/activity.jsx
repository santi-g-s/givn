import Script from 'next/script';

export default function ActivityTable(props) {
    const account_id = props.account_id;

    return (
        <>
            <Script src="https://ui.s.unit.sh/components.js" />
            <unit-elements-activity
                account-id={account_id}
                customer-token={process.env.NEXT_PUBLIC_UNIT_TOKEN}
                theme=""
            ></unit-elements-activity>
        </>
    );
}