import { DeployTypes } from "@app-enums";

export const contractAddresses: Record<DeployTypes, { verifyAddress: string }> = {
  [DeployTypes.BASIC_MATH]: { verifyAddress: "0x075eB9Dc52177Aa3492E1D26f0fDE3d729625d2F" },
  [DeployTypes.CONTROL_STRUCTURES]: { verifyAddress: "0xF4D953A3976F392aA5509612DEfF395983f22a84" },
  [DeployTypes.EMPLOYEE_STORAGE]: { verifyAddress: "0x567452C6638c0D2D9778C20a3D59749FDCaa7aB3" },
  [DeployTypes.ARRAYS_EXERCISE]: { verifyAddress: "0x5b0f80ca6f5bd60cc3b64f0377f336b2b2a56cdf" },
  [DeployTypes.FAVORITE_RECORDS]: { verifyAddress: "0xD32E3ACe3272e2037003Ca54CA7E5676f9b8D06C" },
  [DeployTypes.GARAGE_MANAGER]: { verifyAddress: "0x9eb1fa4cd9bd29ca2c8e72217a642811c1f6176d" },
  [DeployTypes.INHERITANCE_SUBMISSION]: { verifyAddress: "0xF90dA05e77a33Fe6D64bc2Df84e7dd0069A2111C" },
  [DeployTypes.IMPORTS_EXERCISE]: { verifyAddress: "0x8dd188ec36084d59948f90213afcd04429e33c0c" },
  [DeployTypes.ERROR_TRIAGE_EXERCISE]: { verifyAddress: "0xc1bd0d9a8863f2318001bc5024c7f5f58a2236f7" },
  [DeployTypes.ADDRESS_BOOK_FACTORY]: { verifyAddress: "0x4f21e69d0cde8c21cf82a6b37dda5444716afa46" },
  [DeployTypes.UNBURNABLE_TOKEN]: { verifyAddress: "0x10Ce928030E136EcC74d4a4416Db9b533e3c694D" },
  [DeployTypes.WEIGHTED_VOTING]: { verifyAddress: "0x4F333c49B820013e5E6Fe86634DC4Da88039CE50" },
  [DeployTypes.HAIKU_NFT]: { verifyAddress: "0x15534ED3d1dBA55148695B2Ba4164F147E47a10c" },
  [DeployTypes.MESSAGE]: { verifyAddress: "" },
  [DeployTypes.TOKEN]: { verifyAddress: "" },
  [DeployTypes.NFT]: { verifyAddress: "" },
  [DeployTypes.GM]: { verifyAddress: "" }
};
