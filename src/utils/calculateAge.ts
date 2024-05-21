function calculateAge(birthDate: string) {
    const birthTimestamp = new Date(birthDate).getTime();
    const now = Date.now();
    const ageMilliseconds = now - birthTimestamp;
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const ageYears = ageMilliseconds / millisecondsPerYear;
    return ageYears;
}

export default calculateAge;
