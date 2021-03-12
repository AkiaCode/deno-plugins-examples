use deno_core::plugin_api::Interface;
use deno_core::plugin_api::Op;
use deno_core::plugin_api::ZeroCopyBuf;

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
  interface.register_op("testSync", op_test_sync);
}


pub fn op_test_sync(_interface: &mut dyn Interface, _zero_copy: &mut [ZeroCopyBuf],) -> Op {
    let result = b"test";
    let result_box: Box<[u8]> = Box::new(*result);
    Op::Sync(result_box)
}
