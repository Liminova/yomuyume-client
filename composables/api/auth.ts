import type { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData";

type LognServerResponse = {
	token: string;
};

type LoginFnResponse = {
	status: AsyncDataRequestStatus;
	token: string;
	message: string;
};

async function login(body: { login: string; password: string }): Promise<LoginFnResponse> {
	const { data, status } = await useFetch("/api/auth/login", {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	if (status.value === "error") {
		const message = (data.value as GenericResponseBody).message;

		return { status: status.value, token: "", message };
	}

	return {
		status: status.value,
		token: (data.value as LognServerResponse).token,
		message: "",
	};
}

async function register(body: {
	username: string;
	email: string;
	password: string;
}): Promise<{ status: AsyncDataRequestStatus; message: string }> {
	const { data, status } = await useFetch("/api/auth/register", {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	if (status.value === "error") {
		const message = (data.value as GenericResponseBody).message;

		return { status: status.value, message };
	}

	return { status: status.value, message: "" };
}

async function resetPassword(email: string): Promise<string> {
	const { data, status } = await useFetch(`/api/auth/reset/${email}`, {
		baseURL: globalStore.instanceAddr,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (status.value === "error") {
		return (data.value as GenericResponseBody).message;
	}

	return "Verification email sent";
}

async function confirmReset(password: string, token: string): Promise<string> {
	const { data, status } = await useFetch(`/api/auth/reset`, {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: { password },
	});

	if (status.value === "error") {
		return (data.value as GenericResponseBody).message;
	}

	return "Password reset successfully";
}

async function deleteAccount(email: string): Promise<string> {
	const { data, status } = await useFetch(`/api/auth/delete/${email}`, {
		baseURL: globalStore.instanceAddr,
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (status.value === "error") {
		return (data.value as GenericResponseBody).message;
	}

	return "Confirmation email sent";
}

async function confirmDelete(token: string): Promise<string> {
	const { data, status } = await useFetch(`/api/auth/delete`, {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (status.value === "error") {
		return (data.value as GenericResponseBody).message;
	}

	return "Account deleted";
}

async function verifyAccount() {
	const { data, status } = await useFetch(`/api/auth/verify`, {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (status.value === "error") {
		return (data.value as GenericResponseBody).message;
	}

	return "Confirmation email sent";
}

async function confirmVerification(token: string): Promise<string> {
	const { data, status } = await useFetch(`/api/auth/verify`, {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (status.value === "error") {
		return (data.value as GenericResponseBody).message;
	}

	return "Account verified";
}

export default {
	login,
	register,
	resetPassword,
	verifyAccount,
	confirmVerification,
	confirmReset,
	deleteAccount,
	confirmDelete,
};
