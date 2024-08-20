interface UserPermissionsChange {
    userId: string;
    userAccessToken: string;
    summaryId: string;
    permissions: string[];
    changeTimeInSeconds: number;
  }
  
export interface PermChangeResponse {
    userPermissionsChange: UserPermissionsChange[];
  }