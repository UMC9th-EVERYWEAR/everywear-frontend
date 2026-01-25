export const getWebcamStream = async (
	constraints = { video: true, audio: false },
) => {
	if (!navigator.mediaDevices?.getUserMedia) {
		throw new Error('MediaDevices API not supported');
	}

	return navigator.mediaDevices.getUserMedia(constraints);
};
