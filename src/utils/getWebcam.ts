export const getWebcamStream = async (
	constraints = { video: {
		facingMode: { ideal: 'environment' },  // 후면 카메라 open
		width: { ideal: 1280 },
		height: { ideal: 720 },
	}, audio: false },
) => {
	if (!navigator.mediaDevices?.getUserMedia) {
		throw new Error('MediaDevices API not supported');
	}

	return navigator.mediaDevices.getUserMedia(constraints);
};
