class Trace {

	constructor(traceReq,traceRes){
		this.type=null
		this.id=null
		this.date=null
		this.time=null
		this.logs=[]
		this.request=null
		this.response=null
		this.traceReq=traceReq
		this.traceRes=traceRes
	}
	
}


module.exports=Trace
