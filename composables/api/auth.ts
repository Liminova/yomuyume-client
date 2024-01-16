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
	const { data, status, error } = await useFetch("/api/auth/login", {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return {
			status: "error",
			token: "",
			message: data_.message ?? "Login failed, server doesn't give any reason.",
		};
	}

	const data_ = data.value as LognServerResponse;

	return {
		status: "success",
		token: data_.token,
		message: "",
	};
}

async function register(body: {
	username: string;
	email: string;
	password: string;
}): Promise<{ status: AsyncDataRequestStatus; message: string }> {
	const { status, error } = await useFetch("/api/auth/register", {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return {
			status: status.value,
			message: data_.message ?? "Registration failed, server doesn't give any reason.",
		};
	}

	return { status: status.value, message: "" };
}

async function resetPassword(email: string): Promise<string> {
	const { status, error } = await useFetch(`/api/auth/reset/${email}`, {
		baseURL: globalStore.instanceAddr,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return data_.message ?? "Send email failed, server doesn't give any reason.";
	}

	return "Verification email sent";
}

async function confirmReset(password: string, token: string): Promise<string> {
	const { status, error } = await useFetch(`/api/auth/reset`, {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: { password },
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return data_.message ?? "Reset password failed, server doesn't give any reason.";
	}

	return "Password reset successfully";
}

async function deleteAccount(email: string): Promise<string> {
	const { status, error } = await useFetch(`/api/auth/delete/${email}`, {
		baseURL: globalStore.instanceAddr,
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return data_.message ?? "Send email failed, server doesn't give any reason.";
	}

	return "Confirmation email sent";
}

async function confirmDelete(token: string): Promise<string> {
	const { status, error } = await useFetch(`/api/auth/delete`, {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return data_.message ?? "Delete account failed, server doesn't give any reason.";
	}

	return "Account deleted";
}

async function verifyAccount() {
	const { status, error } = await useFetch(`/api/auth/verify`, {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${globalStore.token}`,
		},
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return data_.message ?? "Verification failed, server doesn't give any reason.";
	}

	return "Confirmation email sent";
}

async function confirmVerification(token: string): Promise<string> {
	const { status, error } = await useFetch(`/api/auth/verify`, {
		baseURL: globalStore.instanceAddr,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (status.value === "error") {
		const data_ = error.value?.data as GenericServerResponse;

		return data_.message ?? "Verification failed, server doesn't give any reason.";
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
