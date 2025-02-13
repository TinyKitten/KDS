import { DEFAULT_CHANNEL, SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import type { NotifyData } from "../models/Notify";
import { playBeep, playUrgentBuzzer } from "../utils/beep";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useSubscribeNotify = () => {
	const [uncheckedNotify, setUncheckedNotify] = useState<NotifyData | null>(
		null,
	);

	const confirm = useCallback(() => setUncheckedNotify(null), []);

	useEffect(() => {
		const notifySub = supabase
			.from<NotifyData>("notifies")
			.on("INSERT", async (payload) => {
				if (payload.new.channel !== (DEFAULT_CHANNEL || "")) {
					return;
				}

				if (payload.new.urgent) {
					playUrgentBuzzer();
				} else {
					playBeep();
				}
				setUncheckedNotify(payload.new);
			})
			.subscribe();

		return () => {
			notifySub.unsubscribe();
		};
	}, []);

	return { uncheckedNotify, confirm };
};

export default useSubscribeNotify;
