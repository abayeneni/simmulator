
export class ClinicData {
  // Client Information
   public userType: string;
   public createClinicUser: string; 
   public createdAt: string;
   public updatedBy: string;
   public statCd: string;

  // Clinic Contact Information
  public contactFullName: string;
  public phoneNum1: string;
  public phoneNum2: string;
  public phoneNum3: string;
  public email: string;

  // Clinic Location Information
  public clinicName: string;
  public addressLine1: string;
  public addressLine2: string;
  public city: string;
  public state: string;
  public zipCode: string
  
  // Additional Clinic Details
  public clinicDate: string;
  public clinicStartTime: string;
  public clinicEndTime: string;
  public participants_4_64: number;
  public participants_65_up: number;
  // Sepcific to Senior:
  // public extraVaccine1: Boolean;
  // public extraVaccine2: Boolean;
  // public extraVaccine3: Boolean;
  // public extraVaccine4: Boolean;
  // public extraVaccine5: Boolean;
  public vaccinations:string[]; 
  // Voucher Program
  public voucherInfo: Boolean

  // Control flags:
  public isValid: boolean = false;
  public showNotes: boolean = true;
  public notes: string;
  public status: string;

  // private String pneumovax23;
	// 	private String prevnar13;
	// 	private String boostrix;
	// 	private String zostavax;
  public pneumovax23: string;
  public prevnar13: string;
  public boostrix: string;
  public zostavax: string;
  public shingrix: string;

  public clinicID:string;

  public pharmaName: string;
  public pharma_cnt: string;
  public pharmaPhnNbr1: string;
  public pharmaPhnNbr2: string;
  public pharmaPhnNbr3: string;

  public division : string;
  public region : string;
  public district : string;

  public cancellationReason:string

  public userId: string;
}
