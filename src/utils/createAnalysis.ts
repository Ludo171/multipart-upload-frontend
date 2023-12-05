import { AxiosInstance } from "axios";

export type CreateAnalysisInput = {
    apiClient: AxiosInstance;
    laboratoryId: string;
    patientId: string;
    biopsyId: string;
}
export const createAnalysis = async ({apiClient,laboratoryId,patientId,biopsyId} : CreateAnalysisInput)=>{
    const payload = {
        laboratoryId: laboratoryId,
        patientId: patientId,
        biopsyId: biopsyId
    }
    const { data: analysis } = await apiClient.request({
        url: "analyses",
        method: "POST",
        data: payload,
});
    return analysis}
